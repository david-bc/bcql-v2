export default {
    grid: {
        columns: [
            { label: 'Time', key: 'eventTime', tooltip: '' },
            { label: 'Actor', key: 'actor', tooltip: '' },
            { label: 'Connector', key: 'providerName', tooltip: '' },
            { label: 'Status', key: 'status', tooltip: '' },
            { label: 'Event', key: 'event', tooltip: '' },
            { label: 'FullText', key: 'fullText', tooltip: '' },


        ]
    },
    bcql: {
        fields: [
            {
                display: "Firstname",
                tooltip: "The given first name of the user",
                fiqlKey: 'firstname.lower',
            }
        ]
    }
};
