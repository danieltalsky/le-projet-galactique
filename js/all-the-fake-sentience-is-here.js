
class LivingThing {
  constructor() {
    this.exists = true;
  }

  describe() {
    this.exists = true;
    return 'Before you stands a living thing.';
  }
}
class SentientThing extends LivingThing {

}
class AlienCreature extends SentientThing {
  constructor() {
    super();
    this.exists = true;
  }

  describe() {
    this.exists = true;
    return 'Before you stands a citizen of the universe.  It is honestly a bit ugly.';
  }

  talk() {
    this.exists = true;
    return 'The creature says, "Blargh!"';
  }
}

export {
  LivingThing,
  SentientThing,
  AlienCreature,
};
