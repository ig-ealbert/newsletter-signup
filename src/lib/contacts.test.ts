import {describe, expect, it} from '@jest/globals';
import { Contacts } from './contacts';
import assert from 'node:assert';
 
describe('Contacts', () => {
  const testingSingleton = new Contacts();
  it('adds a new contact', () => {
    testingSingleton.createOrUpdate({
      firstName: 'firstName1',
      lastName: 'lastName1',
      email: 'email1',
    });
    const allContacts = testingSingleton.getAll();
    assert('email1' in allContacts);
    assert(allContacts['email1'].firstName === 'firstName1');
    assert(allContacts['email1'].lastName === 'lastName1');
    assert.ok(allContacts['email1'].createdTimestamp);
    assert.ok(allContacts['email1'].updatedTimestamp);
  });

  it('updates an existing contact', () => {
    testingSingleton.createOrUpdate({
      firstName: 'firstName1Updated',
      lastName: 'lastName1Updated',
      email: 'email1',
    });
    const allContacts = testingSingleton.getAll();
    assert('email1' in allContacts);
    assert(allContacts['email1'].firstName === 'firstName1Updated');
    assert(allContacts['email1'].lastName === 'lastName1Updated');
    assert.ok(allContacts['email1'].createdTimestamp);
    assert(allContacts['email1'].updatedTimestamp > allContacts['email1'].createdTimestamp);
  });

  it('updates an existing contact case insensitively', () => {
    testingSingleton.createOrUpdate({
      firstName: 'firstNameUpdated',
      lastName: 'lastNameUpdated',
      email: 'Email1',
    });
    const allContacts = testingSingleton.getAll();
    assert('email1' in allContacts);
    assert(allContacts['email1'].firstName === 'firstNameUpdated');
    assert(allContacts['email1'].lastName === 'lastNameUpdated');
    assert.ok(allContacts['email1'].createdTimestamp);
    assert(allContacts['email1'].updatedTimestamp > allContacts['email1'].createdTimestamp);
  })

  it('gets all contacts', () => {
    testingSingleton.createOrUpdate({
      firstName: 'firstName2',
      lastName: 'lastName2',
      email: 'email2',
    });
    const allContacts = testingSingleton.getAll();
    assert('email1' in allContacts);
    assert('email2' in allContacts);
  });

  it('deletes a contact', () => {
    testingSingleton.delete('email2');
    const allContacts = testingSingleton.getAll();
    assert('email1' in allContacts);
    assert(!('email2' in allContacts));
  })
})