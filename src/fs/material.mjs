import { needsReview } from './utils/error.mjs';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';

export class Material {
  constructor(material) {
    this.material = material;
    this.material.uid = uuidv1();

  }
}
