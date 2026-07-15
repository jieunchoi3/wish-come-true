const CONTINENTS = [
  { name: 'Africa', countries: [
    'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon',
    'Central African Republic','Chad','Comoros','Congo','Democratic Republic of the Congo',
    'Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia',
    'Ghana','Guinea','Guinea-Bissau','Ivory Coast','Kenya','Lesotho','Liberia','Libya',
    'Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia',
    'Niger','Nigeria','Rwanda','Sao Tome and Principe','Senegal','Seychelles','Sierra Leone',
    'Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda',
    'Zambia','Zimbabwe',
  ]},
  { name: 'Asia', countries: [
    'Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei','Cambodia',
    'China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel','Japan','Jordan',
    'Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia',
    'Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar',
    'Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Tajikistan',
    'Thailand','Timor-Leste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan',
    'Vietnam','Yemen',
  ]},
  { name: 'Europe', countries: [
    'Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria',
    'Croatia','Czechia','Denmark','Estonia','Finland','France','Germany','Greece','Hungary',
    'Iceland','Ireland','Italy','Latvia','Liechtenstein','Lithuania','Luxembourg',
    'Malta','Moldova','Monaco','Montenegro','Netherlands','North Macedonia','Norway','Poland',
    'Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain',
    'Sweden','Switzerland','Ukraine','United Kingdom','Vatican City',
  ]},
  { name: 'North America', countries: [
    'Antigua and Barbuda','Bahamas','Barbados','Belize','Canada','Costa Rica','Cuba',
    'Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras',
    'Jamaica','Mexico','Nicaragua','Panama','Saint Kitts and Nevis','Saint Lucia',
    'Saint Vincent and the Grenadines','Trinidad and Tobago','United States',
  ]},
  { name: 'South America', countries: [
    'Argentina','Bolivia','Brazil','Chile','Colombia','Ecuador','Guyana','Paraguay','Peru',
    'Suriname','Uruguay','Venezuela',
  ]},
  { name: 'Oceania', countries: [
    'Australia','Fiji','Kiribati','Marshall Islands','Micronesia','Nauru','New Zealand',
    'Palau','Papua New Guinea','Samoa','Solomon Islands','Tonga','Tuvalu','Vanuatu',
  ]},
]

const BASE = {
  time_needed: 'trip',
  cost: 'splurge',
  company: 'any',
  setting: 'travel',
  seasons: ['any'],
  topic_tags: ['travel'],
}

export const COUNTRIES = []
let order = 0
for (const { name: continent, countries } of CONTINENTS) {
  for (const title of countries) {
    order++
    COUNTRIES.push({
      key: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      subtitle: continent,
      meta: { continent, region: continent },
      default_tags: { ...BASE },
      sort_order: order,
    })
  }
}
