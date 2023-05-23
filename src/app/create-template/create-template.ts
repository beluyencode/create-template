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
    zIndex: number
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
        this.url = '';
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
    BACKGROUND = 'background'
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