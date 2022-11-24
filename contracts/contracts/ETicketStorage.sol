// SPDX-License-Identifier: MIT

// Eventnexo Event Storage

pragma solidity ^0.8.0;
import "./SafeMath.sol";
import "./library/share_struct.sol";

contract ETicketStorage {
    using SafeMath for uint256;

    // currenct ticket id
    uint256 currentTicketId;

    mapping(uint256 => SharedStructs.ETicketStruct) eTicketCycles;

    function getCurrentTicketId() external view returns (uint256) {
        return currentTicketId;
    }

    function createTicket(
        address owner,
        uint256 quantity,
        uint256 eventId
    ) external {
        currentTicketId += 1;
        SharedStructs.ETicketStruct storage tStruct = eTicketCycles[
            currentTicketId
        ];
        tStruct.eventId = eventId;
        tStruct.owner = owner;
        tStruct.quantity = quantity;
    }

    function transfer(uint256 ticketId, address newOwner)
        external
        isTicketValid(ticketId)
    {
        SharedStructs.ETicketStruct storage cycle = eTicketCycles[ticketId];

        cycle.owner = newOwner;
    }

    function getTicketInfo(uint256 ticketId)
        external
        view
        isTicketValid(ticketId)
        returns (uint256 quantity, address owner)
    {
        SharedStructs.ETicketStruct memory cycle = eTicketCycles[ticketId];

        return (cycle.quantity, cycle.owner);
    }

    modifier isTicketValid(uint256 ticketId) {
        require(
            ticketId != 0 && ticketId <= currentTicketId,
            "Ticket ID must be within valid TicketId range"
        );
        _;
    }
}
