import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import {Registration} from "../s2-features/f1-auth/a2-registration/Registration";
import {PasswordView} from "../s1-main/m1-ui/common/c1-components/passwordView/PasswordView";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/Registration">
                <Registration/>
            </ComponentPreview>
            <ComponentPreview path="/PasswordView">
                <PasswordView/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;