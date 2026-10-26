// Inline in <head>: applies a saved theme choice before paint so there is no flash.
export const themeScript = `try{var t=localStorage.getItem("senn-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;
