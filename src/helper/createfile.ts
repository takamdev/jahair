export const CreateFile = async (url_name:string,type:string):Promise<File>=>{
    // cree un objet file a partit du chemin vers le fichier
    const cheminFichier = url_name.split(' ')[0];

    const file = new File([
      await fetch(cheminFichier).then(response => response.arrayBuffer())
    ], url_name.split(' ')[1], {
      type: type,
    });
return file
}