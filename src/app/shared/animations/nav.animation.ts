import { createAnimation, AnimationBuilder } from '@ionic/core';

export const navAnimation: AnimationBuilder = (baseEl: any, opts?: any) => {
    return createAnimation()
        .addElement(baseEl)
        .duration(250)
        .fromTo('opacity', '1', '0');
}
