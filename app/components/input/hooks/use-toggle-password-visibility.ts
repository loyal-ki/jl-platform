import {useState} from 'react';

import {IconNameEnum} from '@app/components/icon';

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState(IconNameEnum.EyeClose);

    const handlePasswordVisibility = () => {
        if (rightIcon === IconNameEnum.EyeClose) {
            setRightIcon(IconNameEnum.EyeOpen);
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === IconNameEnum.EyeOpen) {
            setRightIcon(IconNameEnum.EyeClose);
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        rightIcon,
        handlePasswordVisibility,
    };
};
