import { ComponentFixture } from "@angular/core/testing";

export const getElementByTestId = (fixture: ComponentFixture<any>, testId: string): HTMLElement | null => {
    return fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
};