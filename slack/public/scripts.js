const socket = io("http://localhost:3000");
let nsSocket = "";
socket.on("nsList", (nsData) => {
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`;
  });
  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      element.addEventListener("click", (el) => {
        const nsEndpoint = element.getAttribute("ns");
      });
    }
  );
  joinNs("wiki");
});
