import { render, screen } from "@testing-library/react"

import { Button } from "@/ui/components/ui/button/button"

describe("Button Component", () => {
  it("should render a button with default props", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe("BUTTON")
  })

  it("should apply custom className", () => {
    render(<Button className="custom-class">Custom Class</Button>)

    const button = screen.getByRole("button", { name: /custom class/i })
    expect(button).toHaveClass("custom-class")
  })

  it("should render as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test-link">Link Button</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test-link")
  })
})
