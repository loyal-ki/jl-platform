import {FC} from 'react';
import {SvgProps} from 'react-native-svg';

import {IconNameEnum} from './icon-name.enum';

import AgreeCheck from '@assets/svg/agree_check.svg';
import ArrowDown from '@assets/svg/arrow_down.svg';
import ArrowLeft from '@assets/svg/arrow_left.svg';
import ArrowRight from '@assets/svg/arrow_right.svg';
import ArrowUp from '@assets/svg/arrow_up.svg';
import Confirmation from '@assets/svg/confirmation.svg';
import CrossSquareIcon from '@assets/svg/cross-square.svg';
import DegreeCheck from '@assets/svg/degree_check.svg';
import DoneIcon from '@assets/svg/done.svg';
import Erase from '@assets/svg/erase.svg';
import EyeClose from '@assets/svg/eye_close.svg';
import EyeOpen from '@assets/svg/eye_open.svg';
import FacebookIcon from '@assets/svg/facebook.svg';
import GoogleIcon from '@assets/svg/google.svg';
import Information from '@assets/svg/information.svg';
import Level from '@assets/svg/level.svg';
import Occupation from '@assets/svg/occupation.svg';
import PasswordHideIcon from '@assets/svg/password_hide.svg';
import VerifiedEmailIcon from '@assets/svg/verified_email.svg';
import WifiOnlineIcon from '@assets/svg/wifi_connected.svg';
import WifiOffIcon from '@assets/svg/wifi_off.svg';

export const iconNameMap: Record<IconNameEnum, FC<SvgProps>> = {
    [IconNameEnum.ArrowLeft]: ArrowLeft,
    [IconNameEnum.ArrowRight]: ArrowRight,
    [IconNameEnum.ArrowUp]: ArrowUp,
    [IconNameEnum.ArrowDown]: ArrowDown,
    [IconNameEnum.DoneIcon]: DoneIcon,
    [IconNameEnum.CrossSquareIcon]: CrossSquareIcon,
    [IconNameEnum.VerifiedEmailIcon]: VerifiedEmailIcon,
    [IconNameEnum.PasswordHideIcon]: PasswordHideIcon,
    [IconNameEnum.WifiOffIcon]: WifiOffIcon,
    [IconNameEnum.WifiOnlineIcon]: WifiOnlineIcon,
    [IconNameEnum.FacebookIcon]: FacebookIcon,
    [IconNameEnum.GoogleIcon]: GoogleIcon,
    [IconNameEnum.AgreeCheck]: AgreeCheck,
    [IconNameEnum.DegreeCheck]: DegreeCheck,
    [IconNameEnum.EyeClose]: EyeClose,
    [IconNameEnum.EyeOpen]: EyeOpen,
    [IconNameEnum.Erase]: Erase,
    [IconNameEnum.Information]: Information,
    [IconNameEnum.Occupation]: Occupation,
    [IconNameEnum.Level]: Level,
    [IconNameEnum.Confirmation]: Confirmation,
};
