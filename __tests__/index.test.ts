import traduora from "../src/index";
import {config} from "./config";

describe("Manager", () => {
    test("test manager", async () => {
        const data = await traduora.init(config);
        console.log(data);
        expect(true).toEqual(true);

    });
});
