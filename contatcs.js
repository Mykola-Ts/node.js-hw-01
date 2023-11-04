import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("bd", "contacts.json");

function updateContacts(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const сontactById = contacts.find(({ id }) => id === contactId);

  return сontactById || null;
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  updateContacts(contacts);

  return newContact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(index, 1);
  updateContacts(contacts);

  return removeContact;
}
