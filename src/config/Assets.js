export default {
  grid: {
    columns: [
      { label: 'Name', key: 'docName', tooltip: '' },
      { label: 'Email', key: 'email', tooltip: '' },
      // { label: 'Application', key: 'providers', tooltip: '' },
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
