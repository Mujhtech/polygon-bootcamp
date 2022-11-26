// SPDX-License-Identifier: MIT

// Eventnexo

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./SafeMath.sol";
import "./library/share_struct.sol";


contract Eventnexo is ERC721, Ownable, Pausable, ERC721URIStorage {
    using SafeMath for uint256;

    // currenct ticket id
    uint256 currentTicketId;

    mapping(uint256 => SharedStructs.ETicketStruct) eTicketCycles;

    event TicketMint(uint256 ticketId, address owner);
    event TicketTransfer(uint256 ticketId, address owner, address newOwner);

    constructor() ERC721("Eventnexo", "ENFT") {}


    // buy event
    function buyTicket(string memory eventId, uint256 quantity, string memory nftUri) public payable {

        currentTicketId += 1;
        SharedStructs.ETicketStruct storage tStruct = eTicketCycles[
            currentTicketId
        ];
        tStruct.eventId = eventId;
        tStruct.owner = msg.sender;
        tStruct.quantity = quantity;

        _mint(msg.sender, currentTicketId);

        _setTokenURI(currentTicketId, nftUri);

        emit TicketMint(currentTicketId, msg.sender);
    }

    // buy event
    function transferTicket(uint256 ticketId, address newOwner) public payable {
        //  Check if the ticket ID is valid
        require(
            ticketId > 0 && ticketId <= currentTicketId,
            "Event ID must be within valid EventId range"
        );

        SharedStructs.ETicketStruct storage ticket = eTicketCycles[ticketId];

        //  Check if the owner is the one calling this function
        require(
            ticket.owner != msg.sender,
            "You don't have access to transfer this ticket"
        );

        ticket.owner = newOwner;

        _transfer(msg.sender, newOwner, ticketId);

        emit TicketTransfer(ticketId, msg.sender, newOwner);
    }

    function getTicketLength() public view returns (uint256) {
        return currentTicketId;
    }


    function getTicket(uint256 ticketId)
        public
        view
        returns (SharedStructs.ETicketStruct memory)
    {
        SharedStructs.ETicketStruct memory ticket = eTicketCycles[ticketId];

        return ticket;
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
