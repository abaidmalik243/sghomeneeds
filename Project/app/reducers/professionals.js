import { fromJS } from 'immutable';
import { LISTINGS, MODEL_MAP, FILES, GALLERIES } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';
// import { WP_POSTS } from '../actions/wpApi';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
    LIST: { loading: true },
    GET: {
      id: -1,
      url: 'http://localhost:8000/api/listings/1-asia-manpower-services-456/',
      merchant: 177,
      wp_post_id: 6894,
      name: '1 Asia Manpower Services',
      slug: '1-asia-manpower-services-456',
      cateogries_text:
        'Full Time Maid,Maid Service,Maid Service for the Young,Maid Services for Seniors,Senior Caretaker,Young Caretaker',
      default_categories: 'Maid Service',
      tags: '',
      address: '51 Bukit Batok Crescent #07-32 Unity Centre',
      city: 'Singapore',
      region: 'Singapore',
      country: 'Singapore',
      latitude: '1.337794',
      longitude: '103.757088',
      postal_code: '',
      timing: '',
      phone: '9191 5229',
      email: 'emenching@gmail.com',
      website: 'http://www.bestmaid.com.sg/listagency.asp?id=1720',
      facebook: '',
      twitter: '',
      video: null,
      logo: null,
      home_match_badge: false,
      best_pros_badge: false,
      is_verified: false,
      about_rich_text:
        "1 Asia Manpower Services is an established MOM registered manpower resource organization based in Singapore. Through the years, we have been highly successful in providing Filipino maids, Indonesian maids, Myanmar maids, etc. We have many satisfied Employers as our customers.\n\nWe are a manpower sourcing &amp; supply firm in the Asia region, providing recruiting and staffing solution to various business across different industries and to the domestic sector. Comprise of 2 division: Corporate B2B &amp; Retail. 1 Asia Manpower Resources offers dedicated human resources services that include:\n<ul>\n \t<li>Domestic Workers placement</li>\n \t<li>Part time maid recruitment &amp; assignment</li>\n \t<li>Permanent / Contract placement</li>\n \t<li>Work pass application</li>\n \t<li>Executive job placement</li>\n \t<li>Supply of skill / semi skill / general workers</li>\n \t<li>Our strong source of domestic workers are from Indonesia, Philippines &amp; Myanmar. We carefully select and train our maid for competency &amp; quality to meet the Employers' demands.</li>\n</ul>\n1 Asia Manpower Services strives to provide fast, reliable and value added services to our clients while keeping the price low and economical.\n\nWe are highly inspired &amp; determined to provide quality services to every of our Customer, with a dedicated and sincere people oriented approach to make every job placement a satisfaction to all of our Clients.\n\nPlease feel free to call us or drop us your enquiry and we are glad to be of your assistance.\n<h3>Services provided by 1 Asia Manpower Services:</h3>\n<ul>\n \t<li>Job placement services for foreign maids</li>\n \t<li>Direct hire your own foreign maids</li>\n \t<li>Placement of transfer maids</li>\n \t<li>Training courses &amp; Workshops\n<ul>\n \t<li>Training Care of Babies</li>\n</ul>\n<ul>\n \t<li>Care of Elderly or Disabled Training</li>\n \t<li>General Orientation for Employment as a Maid in Singapore</li>\n \t<li>Training in Cooking</li>\n \t<li>Training Lesson in Spoken English</li>\n</ul>\n</li>\n \t<li>Home Leave Processing</li>\n \t<li>Application of work permits</li>\n \t<li>Renewal of passports and work permits</li>\n \t<li>Embassy endorsement</li>\n \t<li>Cancellation of work permits</li>\n \t<li>Booking and Purchasing of air tickets</li>\n \t<li>Purchasing of banker guarantee and insurance for maids</li>\n \t<li>Repatriation of maids</li>\n \t<li>Arrangement of medical check up for maids</li>\n \t<li>Other foreign worker related services</li>\n</ul>",
      special_offers: '',
    },
    POST: { loading: true },
  },
  [FILES.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  [GALLERIES.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
  // [WP_POSTS.MODEL]: {
  //   LIST: [],
  //   GET: {},
  // },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if ([LISTINGS.MODEL, FILES.MODEL, GALLERIES.MODEL].indexOf(model) === -1) {
    return state;
  }
  const updated = state.toJS();
  switch (action.type) {
    case MODEL_MAP[model].LIST.SUCCESS:
      updated[model].LIST = action.payload;
      return state.merge(updated);
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      updated[model].GET = action.payload;
      return state.merge(updated);
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [model]: {
          POST: action.payload,
        },
      });
    default:
      return state;
  }
}
