// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductTracking {
    struct ProductTransaction {
        string producerName;     
        string location;
        uint256 price;
        uint256 transportCost;                
        uint256 timestamp;
    }

    struct Product {
        string productId;  
        ProductTransaction[] history;
        bool exists;
    }

    mapping(string => Product) private products;

    event ProductCreated(string productId, string participantName);
    event ProductUpdated(string productId);

    function createProduct(
        string memory _productId,
        string memory _producerName,
        string memory _location,
        uint256 _price,
        uint256 _transportCost
    ) public {
        require(!products[_productId].exists, "Product already exists. Use updateProduct.");
        
        Product storage p = products[_productId];
        p.productId = _productId;
        p.exists = true;

        p.history.push(ProductTransaction({
            producerName: _producerName,
            location: _location,
            price: _price,
            transportCost: _transportCost,
            timestamp: block.timestamp
        }));

        emit ProductCreated(_productId, _producerName);
    }

    function updateProduct(
        string memory _productId,
        string memory _location,
        uint256 _price,
        uint256 _transportCost
    ) public {
        require(products[_productId].exists, "Product does not exist. Use createProduct first.");

        Product storage p = products[_productId];
        string memory producer = p.history[0].producerName;
        p.history.push(ProductTransaction({
            producerName: producer,
            location: _location,
            price: _price,
            transportCost: _transportCost,
            timestamp: block.timestamp
        }));

        emit ProductUpdated(_productId);
    }

    function getProductHistory(string memory _productId) public view returns (ProductTransaction[] memory) {
        require(products[_productId].exists, "Product does not exist.");
        return products[_productId].history;
    }

    function productExists(string memory _productId) public view returns (bool) {
        return products[_productId].exists;
    }
}
