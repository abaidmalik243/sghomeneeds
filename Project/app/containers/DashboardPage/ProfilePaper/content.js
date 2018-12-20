import c from '../../Common/categories.json';
export const categories = c;

export const listingForm = {
  fields: [
    {
      label: 'Postal Code',
      type: 'hidden',
      inputProps: {
        placeholder: 'Postal Code',
        name: 'postal_code',
        defaultValue: '760627',
      },
    },
    {
      label: 'City',
      type: 'hidden',
      inputProps: {
        placeholder: 'City',
        name: 'city',
        defaultValue: 'Singapore',
      },
    },
    {
      label: 'Region',
      type: 'hidden',
      inputProps: {
        placeholder: 'Region',
        name: 'region',
        defaultValue: 'Singapore',
      },
    },
    {
      label: 'Country',
      type: 'hidden',
      inputProps: {
        placeholder: 'Country',
        name: 'country',
        defaultValue: 'Singapore',
      },
    },
    {
      label: 'Latitude',
      type: 'hidden',
      inputProps: {
        placeholder: 'Latitude',
        name: 'latitude',
        defaultValue: '1.324613',
      },
    },
    {
      label: 'Longitude',
      type: 'hidden',
      inputProps: {
        placeholder: 'Longitude',
        name: 'longitude',
        defaultValue: '103.811903',
      },
    },
    {
      label: 'Timing',
      type: 'hidden',
      inputProps: {
        placeholder: 'Timing',
        name: 'timing',
        defaultValue: '24 hours',
      },
    },
    {
      label: 'Phone',
      type: 'text',
      inputProps: {
        placeholder: 'Phone',
        name: 'phone',
        defaultValue: '+65 12345678',
      },
    },
  ],
};
