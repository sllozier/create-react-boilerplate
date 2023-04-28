//require db and any models
const { db } = require("./");

//require and data files to use in seeding

const seed = async () => {
  try {
    console.log(`Seeding started...`);
    await db.sync({ force: true });

    // ACCOUNTS EXAMPLE
    // const accountData = await getPeoples();
    // const accounts = await Promise.all(
    //   accountData.map((account) => Account.create(account))
    // );

    console.log(
      `Seeding successful!`
      //" Special Methods Check :", Object.keys("Model".prototype),
    );
  } catch (error) {
    console.log(`Seeding Problem! Error in seed Function: ${error}`);
  }
};
const runSeed = async () => {
  console.log(`Start seeding...`);
  try {
    await seed();
  } catch (error) {
    console.error("RUN SEED ERROR", error);
    process.exitCode = 1;
  } finally {
    console.log(`closing db connection`);
    await db.close();
    console.log(`db connection closed`);
  }
};

if (module === require.main) {
  runSeed();
}

module.exports = seed;
