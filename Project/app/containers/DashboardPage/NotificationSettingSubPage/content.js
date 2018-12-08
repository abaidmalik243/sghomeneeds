import { generateText } from '../../../utils/loremIpsumGenerator';

export const PushNotificationSettings = [
  {
    settingName: 'Message',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Project Reminders & Updates',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Promotion & Tips',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Account Support',
    settingDesc: generateText(50),
    defaultBool: true,
  },
];

export const TextSettings = [
  {
    settingName: 'All Text Notification',
    defaultBool: true,
  },
];

export const EmailSettings = [
  {
    settingName: 'Help tips & inspiration',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Recommendation',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Special Offer',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Invitation To give feedback',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Reminders',
    settingDesc: generateText(50),
    defaultBool: true,
  },
  {
    settingName: 'Others',
    settingDesc: generateText(50),
    defaultBool: true,
  },
];
