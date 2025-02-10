import figlet from "figlet";
import chalk from "chalk";

const appName = process.env.APP_NAME || "customer-api";

figlet(appName, { font: "ogre"}, (err, data) => {
    if (err) {
        console.log("Error generando el banner");
        console.dir(err);
        return;
    }
    console.log(chalk.blue.bold(data));
});
