const Manager = require("../lib/Manager");

test("Can set office number via constructor", () => {
    const testValue = 123;
    const e = new Manager("Guy", 1, "test@test.com", testValue);
    expect(e.officeNumber).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
    const testValue = "Manager";
    const e = new Manager("Guy", 1, "test@test.com", 123);
    expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOfficeNumber()", () => {
    const testValue = 123;
    const e = new Manager("Guy", 1, "test@test.com", testValue);
    expect(e.getOfficeNumber()).toBe(testValue);
});
