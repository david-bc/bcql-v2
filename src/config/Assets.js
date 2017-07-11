export default {
  grid: {
    columns: [
      { label: 'Name', key: 'title', tooltip: '' },
      { label: 'Email', key: 'email', tooltip: '' },
      { label: 'Permissions', key: 'permission', tooltip: '' },
      { label: 'Type', key: 'mimeType', tooltip: '' },
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
