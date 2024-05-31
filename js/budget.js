const btnPDF = document.getElementById('PDF');
btnPDF.addEventListener('click', async () => {
  // Conteúdo do PDF
  const content = document.querySelector('body');

  // Configuração do arquivo final do PDF
  const options = {
    filename: "budget.pdf",
    html2canvas: { scale: 1},
    jsPDF: { unit: "mm", format: 'A4', orientation: "portrait" }
  };
  btnPDF.style.display = "none"

  // Gerar e salvar o PDF
  await html2pdf().set(options).from(content).save()

  btnPDF.style.display = "initial"


})
