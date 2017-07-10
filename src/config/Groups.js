export default {
    grid: {
        columns: [
            { label: 'Name', key: 'name', tooltip: '' },
            // { label: 'Email', key: 'email', tooltip: '' },
            { label: 'Application', key: 'provider_name', tooltip: '' },
            { label: 'Type', key: 'group_type', tooltip: '' },
            { label: 'Membercount', key: 'member_count', tooltip: '' },

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
