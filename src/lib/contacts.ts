/*
This is where the list of contacts are stored.
In a production system, this would be a database.
The database would need to be either living in the cloud,
or backed up to the cloud regularly.
For this example app, we will use a class with a JSON object.
*/

import { contactInfo } from "@/types/contactInfo";
import { contactList } from "@/types/contactList";

class Contacts {
  // The list of contacts starts off empty
  private contacts: contactList = {};

  createOrUpdate(contact: contactInfo) {
    if (contact.email in this.contacts) {
      const info = this.contacts[contact.email];
      info.firstName = contact.firstName || info.firstName;
      info.lastName = contact.lastName || info.lastName;
      info.updatedTimestamp = Date.now();
    }
    else {
      this.contacts[contact.email] = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        createdTimestamp: Date.now(),
        updatedTimestamp: Date.now(),
      };
    }
    return this.contacts[contact.email];
  }

  getAll() {
    return this.contacts;
  }

  // This is not in the requirements but I think it should be here
  // Removal from a mailing list is a common action
  delete(email: string) {
    delete this.contacts[email];
    return true;
  }
}

export const contactsSingleton = new Contacts();
