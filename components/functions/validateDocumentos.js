import { useSelector } from "react-redux";

const useDocumentValidation = () => {
    
    const userData = useSelector((state) => state.user.userData);

    let documentos = userData.documentacion?.validacion_documentos;
    const extranjero = userData.perfil.extranjero;
    const date = userData.documentacion?.updated_at;
    const personType = userData.person_type
    const rejectedMessages = userData.documentacion?.rejected_messages

    let enRevision = true;
    let conError = false;
    let validados = false;
    let documentosError = [];
    let documentoRvesion = []
    const data = [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formattedDate = formatDate(date);

    const backupInfo = userData.documentacion;

    const addDocumentData = (title, file, type, docKey) => {
        const valor = documentos[docKey];
        data.push({
            title: title,
            file: file,
            date: formattedDate,
            type: type,
            validate: valor === "3" ? true : false
        });

        if(valor === 1 || valor === "1") {
          documentoRvesion.push(docKey)
        }

        if (valor === "2") {
            conError = true;
            documentosError.push(docKey);
        }

        if (valor !== 1 && valor !== "1") {
            enRevision = false;
        }
    };

    if (backupInfo.comprobante_domicilio) {
      const title = personType === 'persona_fisica_sf' ? 'Comprobante de domicilio' : 'Comprobante de domicilio fiscal';
        addDocumentData(title, backupInfo.comprobante_domicilio, "comprobante_domicilio", "comprobante_domicilio");
    }

    if (backupInfo.anverso_identificacion) {
        const title = extranjero === 1 ? 'Anverso ID del país de origen' : 'INE- Cara frontal';
        addDocumentData(title, backupInfo.anverso_identificacion, "anverso_identificacion", "anverso_identificacion");
    }

    if (backupInfo.caratula_estado_cuenta) {
        addDocumentData('Carátula estado de cuenta', backupInfo.caratula_estado_cuenta, "caratula_estado_cuenta", "caratula_estado_cuenta");
    }

    if (backupInfo.reverso_identificacion) {
        const title = extranjero === 1 ? 'Reverso ID del país de origen' : 'INE- Reverso';
        addDocumentData(title, backupInfo.reverso_identificacion, "reverso_identificacion", "reverso_identificacion");
    }

    if (backupInfo.imagen_curp) {
      addDocumentData('CURP emitido por RENAPO', backupInfo.imagen_curp, "imagen_curp", "imagen_curp");
    }

    if (backupInfo.imagen_rfc) {
      const title = personType === 'persona_fisica_sf' ? 'RFC emitido por el SAT' :'RFC persona moral';
      addDocumentData(title, backupInfo.imagen_rfc, "imagen_rfc", "imagen_rfc");
    }

    if (backupInfo.anverso_forma_migratoria) {
      addDocumentData('Anverso forma migratoria', backupInfo.anverso_forma_migratoria, "anverso_forma_migratoria", "anverso_forma_migratoria");
    }

    if (backupInfo.reverso_forma_migratoria) {
      addDocumentData('Reverso forma migratoria', backupInfo.reverso_forma_migratoria, "reverso_forma_migratoria", "reverso_forma_migratoria");
    }

    if (backupInfo.caratula_pasaporte) {
      addDocumentData('Carátula del pasaporte', backupInfo.caratula_pasaporte, "caratula_pasaporte", "caratula_pasaporte");
    }

    if (backupInfo.acta_constitutiva) {
      addDocumentData('Acta constitutiva', backupInfo.acta_constitutiva, "acta_constitutiva", "acta_constitutiva");
    }

    if (backupInfo.poder_notarial) {
      addDocumentData('Poder Notarial', backupInfo.poder_notarial, "poder_notarial", "poder_notarial");
    }

    if (backupInfo.comprobante_domicilio_rep_legal) {
      addDocumentData('Comprobante de domicilio representante legal', backupInfo.comprobante_domicilio_rep_legal, "comprobante_domicilio_rep_legal", "comprobante_domicilio_rep_legal");
    }

    const todosValidados = Object.values(documentos).every(valor => valor === "3");
    if (todosValidados) {
        validados = true;
    }
  
    return {
        enRevision,
        conError,
        documentosError,
        documentoRvesion,
        validados,
        data,
        rejectedMessages
    };
};

export default useDocumentValidation;
