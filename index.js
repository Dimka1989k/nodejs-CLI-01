const contactsList = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone, data }) => {
  switch (action) {
    case "getAll":
      const contacts = await contactsList.listContacts();
      console.log(contacts);
      break;
    case "getById":
      const contact = await contactsList.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const newContact = await contactsList.addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const removeContact = await contactsList.removeContact(id);
      console.log("removed:", removeContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
