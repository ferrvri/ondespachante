
export interface EditPageControl {
    controlType: 'text' | 'number' | 'select' | 'checkbox' | 'radio';
    label: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    value?: string;
    mask?: string;
    selectOptions?: Array<{ name: string, value?: string }>,
    blurred?: Function;
    onChange?: Function;
}