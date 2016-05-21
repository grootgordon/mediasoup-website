module.exports = function()
{
	var arrow = document.querySelector('.arrow-up');
	var isVisible = false;
	var elem;

	if (!arrow)
		return;

	document.addEventListener('scroll', function()
	{
		if (!elem)
		{
			// Hack: https://miketaylr.com/posts/2014/11/document-body-scrolltop.html

			if (document.documentElement && document.documentElement.scrollTop)
				elem = document.documentElement;
			else if (document.body.parentNode && document.body.parentNode.scrollTop)
				elem = document.body.parentNode;
			else if (document.body.scrollTop)
				elem = document.body;

			if (!elem)
				return;
		}

		var scrollHeight = elem.scrollHeight;
		var visibleHeight = elem.offsetHeight;
		var scrollTop = elem.scrollTop;

		if ((scrollTop > visibleHeight) && (scrollTop + visibleHeight < scrollHeight - 150))
		{
			if (!isVisible)
			{
				isVisible = true;
				arrow.classList.add('visible');
			}
		}
		else
		{
			if (isVisible)
			{
				isVisible = false;
				arrow.classList.remove('visible');
			}
		}
	});

	arrow.addEventListener('click', function()
	{
		// Hack: https://miketaylr.com/posts/2014/11/document-body-scrolltop.html
		var d = document;

		if (d.documentElement && d.documentElement.scrollTop)
			d.documentElement.scrollTop = 0;
		else if (d.body.parentNode && d.body.parentNode.scrollTop)
			d.body.parentNode.scrollTop = 0;
		else if (d.body && d.body.scrollTop)
			d.body.scrollTop = 0;
	});
};