export default {
  grid: {
    columns: [
      { label: 'Name', key: 'name', tooltip: '' },
      { label: 'Email', key: 'email', tooltip: '' },
      // { label: 'Application', key: 'providers', tooltip: '' },
      { label: 'Status', key: 'status', tooltip: '' },
      { label: 'Role', key: 'admin', tooltip: '' },
      { label: 'Last Login', key: 'last_login', tooltip: '' },
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
