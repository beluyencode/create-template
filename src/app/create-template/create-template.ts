export interface Template {
    x: number;
    y: number;
    content: string;
    name: string;
    width: number;
    height: number;
    color: string;
    align: string;
    hidden: boolean;
    type: TypeTemplate,
    url?: string;
    id: string;
    fontSize: number,
    background: string,
    rotate: number;
    padding: number;
    borderRadius: number;
    zIndex: number,
    checkInOptions: TemplateCheckIn
}

export interface TemplateCheckIn {
    activeType: checkInState,
    notFound: {
        content: string;
        name: string;
        color: string;
        hidden: boolean;
        type: TypeTemplate,
        url?: string;
        fontSize: number,
        background: string,
        rotate: number;
        padding: number;
        borderRadius: number;
        zIndex: number,
        width: number;
        height: number;
        align: string;
    },
    checkedIn: {
        content: string;
        name: string;
        color: string;
        hidden: boolean;
        type: TypeTemplate,
        url?: string;
        fontSize: number,
        background: string,
        rotate: number;
        padding: number;
        borderRadius: number;
        zIndex: number,
        width: number;
        height: number;
        align: string;
    },
    checkIn: {
        content: string;
        name: string;
        color: string;
        hidden: boolean;
        type: TypeTemplate,
        url?: string;
        fontSize: number,
        background: string,
        rotate: number;
        padding: number;
        borderRadius: number;
        zIndex: number;
        width: number;
        height: number;
        align: string;
    }
}

export interface CheckInOptions {
    width: number,
    background: string,
    height: number
    notFound: any,
    checkIn: any,
    checkedIn: any,
    zIndex: number,
    activeType: checkInState
}

export class Template implements Template {
    constructor(name: string, pos: number) {
        this.x = pos;
        this.y = pos;
        this.content = name;
        this.name = name;
        this.width = 100;
        this.height = 100;
        this.color = '#ffffff';
        this.align = TypeAlign.LEFT;
        this.hidden = false;
        this.type = TypeTemplate.TEXT;
        this.id = ObjectId();
        this.fontSize = 14;
        this.background = 'transparent';
        this.rotate = 0;
        this.padding = 0;
        this.borderRadius = 0
        this.url = '';
        this.zIndex = 0;
        this.checkInOptions = {
            activeType: checkInState.ERROR,
            notFound: {
                align: 'left',
                content: 'not found',
                name: '',
                color: '#ffffff',
                hidden: false,
                type: TypeTemplate.TEXT,
                url: '',
                fontSize: 14,
                background: 'transparent',
                rotate: 0,
                padding: 0,
                borderRadius: 0,
                zIndex: 0,
                width: 100,
                height: 100
            },
            checkedIn: {
                align: 'left',
                content: 'not found',
                name: '',
                color: '#ffffff',
                hidden: false,
                type: TypeTemplate.TEXT,
                url: '',
                fontSize: 14,
                background: 'transparent',
                rotate: 0,
                padding: 0,
                borderRadius: 0,
                zIndex: 0,
                width: 100,
                height: 100
            },
            checkIn: {
                align: 'left',
                content: 'not found',
                name: '',
                color: '#ffffff',
                hidden: false,
                type: TypeTemplate.TEXT,
                url: '',
                fontSize: 14,
                background: 'transparent',
                rotate: 0,
                padding: 0,
                borderRadius: 0,
                zIndex: 0,
                width: 100,
                height: 100
            }
        }
    }

    clone() {
        const cloned = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        Object.setPrototypeOf(cloned, this.constructor.prototype);
        return cloned;
    }

    convertType(template: any) {
        const cloned = Object.assign(this, template);
        Object.setPrototypeOf(cloned, this.constructor.prototype);
        return cloned;
    }
}

export enum checkInState {
    ERROR = 'notFound',
    CHECKED = 'checkedIn',
    CHECKIN = 'checkIn'
}

export function ObjectId(m = Math, d = Date, h = 16, s = (sELe: any) => m.floor(sELe).toString(h)) {
    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
}

export interface BackgroundTemplate {
    url: string,
    name: string,
    scale: string
}

export class BackgroundTemplate implements BackgroundTemplate {
    constructor() {
        this.name = 'background';
        this.url = 'https://images.pexels.com/photos/1235757/pexels-photo-1235757.jpeg?cs=srgb&dl=pexels-elias-tigiser-1235757.jpg&fm=jpg';
        this.scale = TypeScreen.PC
    }
}

export const apiUrl = {
    origin: 'https://api.dev.qrclc.com',
    uploadImg: '/static/upload',
    static: '/static/',
    update: '/api/template/update',
    get: '/api/template/get'
}

export enum TypeTemplate {
    TEXT = 'text',
    IMAGE = 'img',
    BACKGROUND = 'background',
    CHECK_IN = 'check in'
}

export enum TypeAction {
    CHANGE = 'change',
    DELETE = 'delete',
    COPY = 'copy'
}


export enum TypeAlign {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left'
}

export enum TypeScreen {
    PC = '16/9',
    MOBILE = '9/18'
}