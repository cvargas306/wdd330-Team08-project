export function setBreadcrumbs(crumbs) {
  const container = document.querySelector("#breadcrumbs");
  if (!container) return;
  container.innerHTML = ""; 

  crumbs.forEach((crumb, index) => {
    const li = document.createElement("li");

    if (crumb.url && index !== crumbs.length - 1) {
      const a = document.createElement("a");
      a.href = crumb.url;
      a.textContent = crumb.name;
      li.appendChild(a);
    } else {
      li.textContent = crumb.name;
    }

    container.appendChild(li);
  });
}
