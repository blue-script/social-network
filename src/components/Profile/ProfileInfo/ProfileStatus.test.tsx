import ProfileStatus, {ProfileStatusPropsType, ProfileStatusStateType} from "./ProfileStatus";
import {create, ReactTestInstance} from "react-test-renderer"
import React from "react";

describe("ProfileStatus component", () => {
    test("status from props should be in the  state", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const instance: any = component.getInstance();
        expect(instance?.state.status).toBe("it");
    });
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root
        let span: any = root.findByType('span')
        expect(span).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root
        expect(() => {
            root.findByType('input')
        }).toThrow();
    });
    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root
        let span: any = root.findByType('span')
        expect(span.children[0]).toBe("it");
    });
    test("<input> should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="it" updateStatus={() => {
        }}/>);
        const root = component.root
        let span: any = root.findByType('span')
        span.props.onDoubleClick()
        let input: any = root.findByType('input')
        expect(input).not.toBeNull();
        expect(input.props.value).toBe("it");
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="it" updateStatus={mockCallback}/>);
        const instance: any = component.getInstance()
        instance.deactivateEditMode()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(2)
    });
});