document.addEventListener('DOMContentLoaded', function() {
  const challengeForm = document.getElementById('challengeForm');
  
  if (challengeForm) {
    const sendFormData = async (e) => {
      e.preventDefault();

      const formData = new FormData(challengeForm);
      const formDataObject = Object.fromEntries(formData.entries());

      try {
        // Отправка на вебхук
        const n8nResponse = await fetch('https://n8n.psyhodoc.xyz/webhook/8eb4f063-db29-49de-b318-69224bd69913', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataObject)
        });

        if (n8nResponse.ok) {
          // Перенаправление на страницу благодарности после успешной отправки
          window.location.href = 'thank-you.html';
          return; 
        }
        
        console.error("n8n Webhook Error:", await n8nResponse.text());
      } catch (n8nError) {
        console.error("n8n Fetch Error:", n8nError);
      }

      try {
        // Резервная отправка через EmailJS
        await emailjs.send(
          'service_a53sks8',
          'template_2ybk8tj',
          {
            name: formDataObject.name,
            telegram: formDataObject.telegram,
            email: formDataObject.email,
            msg: formDataObject.msg,
          },
          'U44ydi8UJShEwyyJi'
        );
        
        // Перенаправление на страницу благодарности
        window.location.href = 'thank-you.html';
      } catch (emailJSError) {
        console.error("EmailJS Error:", emailJSError);
        alert('Помилка при відправці. Будь ласка, спробуйте пізніше або зв\'яжіться з нами іншим способом.');
      }
    };

    challengeForm.addEventListener('submit', sendFormData);
  }
});