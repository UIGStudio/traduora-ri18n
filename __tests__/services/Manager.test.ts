import Manager from "../../src/services/Manager";
import {config} from "../config";

describe("Filter function", () => {
    test("it should filter by a search term (link)", async () => {
        const manager = new Manager(config);
        expect(manager.getConfig()).toEqual({...config, cacheTtl: 7});

    });
});
