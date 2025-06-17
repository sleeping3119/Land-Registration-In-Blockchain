pragma solidity ^0.8.0;

contract LandRegistry {
    enum LandType { Unknown, Cabin, Apartment, Villa, House }

    struct Land {
        uint256 id;                 
        string title;               
        string location;            
        string image;               
        string hostedBy;            
        LandType landType;          
        string amenities;           
        uint8 numberOfGuests;       
        uint8 bedrooms;             
        int8 bathrooms;             
        uint256 pricePerNight;      
        address owner;              
        bool forSale;               
    }

    struct User {
        address userAddress;        
        uint256 balance;            
    }

    mapping(uint256 => Land) public landRegistry; 
    mapping(address => uint256[]) public ownerLands; 
    mapping(address => User) public users; // Mapping for users
    uint256 public landCount; 

    modifier onlyExistingUser(address _user) {
        require(users[_user].userAddress != address(0), "User does not exist");
        _;
    }

    function addUser(address _userAddress, uint256 _balance) public {
        require(users[_userAddress].userAddress == address(0), "User already exists");
        users[_userAddress] = User({
            userAddress: _userAddress,
            balance: _balance
        });
    }

    function deleteUser(address _userAddress) public onlyExistingUser(_userAddress) {
        require(ownerLands[_userAddress].length == 0, "User owns lands, cannot delete");
        delete users[_userAddress];
    }

    function addLand(
        uint256 _id,
        string memory _title,
        string memory _location,
        string memory _image,
        string memory _hostedBy,
        LandType _landType,
        string memory _amenities,
        uint8 _numberOfGuests,
        uint8 _bedrooms,
        int8 _bathrooms,
        uint256 _pricePerNight
    ) public onlyExistingUser(msg.sender) {
        require(landRegistry[_id].id == 0, "Land with this ID already exists");
        Land memory newLand = Land({
            id: _id,
            title: _title,
            location: _location,
            image: _image,
            hostedBy: _hostedBy,
            landType: _landType,
            amenities: _amenities,
            numberOfGuests: _numberOfGuests,
            bedrooms: _bedrooms,
            bathrooms: _bathrooms,
            pricePerNight: _pricePerNight,
            owner: msg.sender,
            forSale: true
        });
        landRegistry[_id] = newLand;
        ownerLands[msg.sender].push(_id);
        landCount++;
    }

    function fetchLandsByOwner(bool _forSale) public view onlyExistingUser(msg.sender) returns (Land[] memory) {
        uint256[] memory landIds = ownerLands[msg.sender];
        uint256 count = 0;
        for (uint256 i = 0; i < landIds.length; i++) {
            if (landRegistry[landIds[i]].forSale == _forSale) {
                count++;
            }
        }
        Land[] memory result = new Land[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < landIds.length; i++) {
            if (landRegistry[landIds[i]].forSale == _forSale) {
                result[index] = landRegistry[landIds[i]];
                index++;
            }
        }
        return result;
    }

    function fetchLandsForSale() public view returns (Land[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i <= landCount; i++) {
            if (landRegistry[i].forSale) {
                count++;
            }
        }
        Land[] memory result = new Land[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= landCount; i++) {
            if (landRegistry[i].forSale) {
                result[index] = landRegistry[i];
                index++;
            }
        }
        return result;
    }

    function getAllLands() public view returns (Land[] memory) {
        Land[] memory result = new Land[](landCount);
        for (uint256 i = 1; i <= landCount; i++) {
            result[i - 1] = landRegistry[i];
        }
        return result;
    }


    function addBalance(address _userAddress, uint256 _amount) public onlyExistingUser(_userAddress) {
    users[_userAddress].balance += _amount; 
    }

    function buyLand(uint256 _landId) public onlyExistingUser(msg.sender) {
        Land storage land = landRegistry[_landId];
        require(land.forSale, "Land is not for sale");
        require(users[msg.sender].balance >= land.pricePerNight, "Insufficient balance");

        users[msg.sender].balance -= land.pricePerNight;
        users[land.owner].balance += land.pricePerNight;

        uint256[] storage sellerLands = ownerLands[land.owner];
        for (uint i = 0; i < sellerLands.length; i++) {
            if (sellerLands[i] == _landId) {
                sellerLands[i] = sellerLands[sellerLands.length - 1];
                sellerLands.pop();
                break;
            }
        }

        land.owner = msg.sender;
        land.forSale = false;
        ownerLands[msg.sender].push(_landId);
    }

    function deleteLand(uint256 _landId) public {
        require(landRegistry[_landId].id != 0, "Land does not exist");

        address owner = landRegistry[_landId].owner;

        uint256[] storage lands = ownerLands[owner];
        for (uint i = 0; i < lands.length; i++) {
            if (lands[i] == _landId) {
                lands[i] = lands[lands.length - 1];
                lands.pop();
                break;
            }
        }

        delete landRegistry[_landId];
    }

}