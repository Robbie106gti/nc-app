import * as fs from 'fs';
import { createFile } from './create-json';
import _ from 'lodash';
import { RootCard } from './cards.mjs';

const root = [
  'General Information',
  'Base Cabinets',
  'Base Channel Cabinets',
  'Vanity Cabinets',
  'Vanity Channel Cabinets',
  'Floating Vanity Cabinets',
  'Floating Vanity Channel Cabinets',
  'Wall Cabinets',
  'Wall Channel Cabinets',
  'Tall Cabinet',
  'Tall Channel Cabinets',
  'Wardrobe Cabinets',
  'Accessories',
  'Doors',
  'Materials and Finishes',
  'Finished Sides',
  'Columns',
  'Trims and Moldings',
  'Counters',
  'Customization Charges'
];

const cards = root.map(r => new RootCard(r, r));

createFile(cards, 'root');
