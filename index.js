const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "10",
    deviceName: "Android Device",
    app: "C:/Users/MisterX/Desktop/Nueva carpeta/LoginIEI235-debug.apk",
    appPackage: "com.example.loginiei235",
    appActivity: ".MainActivity",
    automationName: "UiAutomator2"
  }
};

async function main () {
  const client = await wdio.remote(opts);
  let Elementos = await client.$$('android.widget.EditText');
  let boton = await client.$('android.widget.Button');
  let textos = await client.$$('android.widget.TextView');
  let estadoUsario = textos[1];
  let estado = await estadoUsario.getText();;
  let email = Elementos[0];
  let password = Elementos[1];
  //prueba1
  await email.setValue("fabian.fernandeza@sansano.usm.cl");
  await password.setValue("test");
  await boton.click();
  estado = await estadoUsario.getText();
  assert.strictEqual(estado,"Usuario conectado: Si")
  //prueba2
  await email.setValue("test@test.cl");
  await password.setValue("test");
  await boton.click();
  estado = await estadoUsario.getText();
  assert.strictEqual(estado,"Usuario conectado: No")
  //prueba3
  await email.setValue("");
  await password.setValue("");
  await boton.click();
  estado = await estadoUsario.getText();
  assert.strictEqual(estado,"Usuario conectado: No")

  await client.deleteSession();
}

main();
