      <div class="playtime-widget card">
        <div class="card-header">
          <button class="widget-header" data-bs-toggle="collapse" data-bs-target="#details">
            Наиграно: <b>{totalStr}</b>
          </button>
          <div id="overallBar" class="mt-2">
            <div class="progress" style="height:10px;">{bars}</div>
          </div>
        </div>
        <div id="details" class="collapse">
          <div class="card-body p-0">
            <table class="table table-sm mb-0">
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
      <script>
        const det = document.getElementById('details'),
              ov  = document.getElementById('overallBar');
        det.addEventListener('show.bs.collapse', ()=> ov.style.display='none');
        det.addEventListener('hide.bs.collapse', ()=> ov.style.display='block');
      </script>