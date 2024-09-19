
// crea clase llama ScrollUtils.ts

export class ScrollUtils {

    static fScrollIntoView(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }


}
