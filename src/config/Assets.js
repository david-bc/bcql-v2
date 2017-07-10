export default {
  grid: {
    columns: [
      { label: 'Name', key: 'docName', tooltip: '' },
      { label: 'Email', key: 'email', tooltip: '' },
      { label: 'Permissions', key: 'permissions', tooltip: '' },
      { label: 'Type', key: 'assetType', tooltip: '' },
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
