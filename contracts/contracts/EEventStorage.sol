// SPDX-License-Identifier: MIT

// Eventnexo Event Storage

pragma solidity ^0.8.0;
import "./SafeMath.sol";
import "./library/share_struct.sol";

contract EEventStorage {
    using SafeMath for uint256;

    // currenct event id
    uint256 currentEventId;

    mapping(uint256 => SharedStructs.EEventStruct) eventCycles;

    // Create Event
    function createEvent(
        string memory title,
        string memory description,
        string memory image,
        string memory nftUri,
        uint256 amount,
        address owner,
        uint256 maxTickets,
        uint256 eventDate
    ) external {
        currentEventId += 1;
        eventCycles[currentEventId] = SharedStructs.EEventStruct({
            title: title,
            image: image,
            nftUri: nftUri,
            maxTickets: maxTickets,
            description: description,
            ticketStatus: SharedStructs.EEventStatus.Start,
            owner: owner,
            eventDate: eventDate,
            amount: amount,
            totalTicketBought: 0
        });
    }

    function increaseNumberOfTicketBought(uint256 eventId, uint256 quantity)
        external
        isEventIdValid(eventId)
        returns (uint256)
    {
        SharedStructs.EEventStruct storage cycle = eventCycles[eventId];

        uint256 totalTicketBought = cycle.totalTicketBought.add(quantity);

        cycle.totalTicketBought = totalTicketBought;

        return totalTicketBought;
    }

    function updateEventStatus(uint256 esusuCycleId, uint256 status) external {
        SharedStructs.EEventStruct storage cycle = eventCycles[esusuCycleId];

        cycle.ticketStatus = SharedStructs.EEventStatus(status);
    }

    function getEventInfo(uint256 eventId)
        external
        view
        isEventIdValid(eventId)
        returns (SharedStructs.EEventStruct memory)
    {
        SharedStructs.EEventStruct memory cycle = eventCycles[eventId];

        return cycle;
    }

    function getCurrentEventId() external view returns (uint256) {
        return currentEventId;
    }

    modifier isEventIdValid(uint256 eventId) {
        require(
            eventId != 0 && eventId <= currentEventId,
            "Event ID must be within valid EventId range"
        );
        _;
    }
}
