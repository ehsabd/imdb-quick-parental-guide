(() => {

    const getGuideSummary = (html) => {
        var el = document.createElement( 'html' );
        el.innerHTML = html;
        el.querySelector('.subpage_title_block').remove();
        el.querySelector('.ipl-itemcount-header').remove();
        el.querySelector('.ipl-jumpto-container').remove();
    
        return el.querySelector('section.article');
    }

    class AnchorParentalGuide{
        constructor(anchor, parentalGuideURL){
            this.anchor = anchor;
            this.parentalGuideURL = parentalGuideURL;
        }

        fetchParentalGuide(){
            fetch(this.parentalGuideURL).then(resp => resp.text()).then(text => {
                console.log(this);
                console.log(text);
                const quickGuideContainer = document.createElement( 'div' );
                quickGuideContainer.style.maxHeight = '400px';
                quickGuideContainer.style.overflow = 'scroll';
                quickGuideContainer.append(getGuideSummary(text));

                this.anchor.parentElement.append(quickGuideContainer);
            })
        }
    }

    const selectors = ['.findList a', 'h3 a']

    let selectedAnchors = []

    let anchorParentalGuides = []

    selectors.forEach((s) => {
        selectedAnchors.push(...Array.from(document.querySelectorAll(s)));
    })

    selectedAnchors.forEach((anchor, index) => {
        const m = anchor.href.match(/\/title\/[a-z0-9]*/);
        console.log(m);
        if (m !== null) {
            anchorParentalGuides.push(new AnchorParentalGuide(anchor, m[0] + '/parentalguide'));
        }
    });

    anchorParentalGuides.forEach((guide)=>{guide.fetchParentalGuide()});

})();

