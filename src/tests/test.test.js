describe("jest", () => {
  it("should pass", () => {
    expect(1).toBe(1)
  })
  it("shouldnt pass", () => {
    expect(1).not.toBe(2)
  })
})
