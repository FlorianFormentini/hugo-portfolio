# Custom Toha Theme

**[Toha v3.8.0](https://github.com/hugo-toha/toha/tree/v3.8.0)** : A [Hugo](https://gohugo.io/) theme for a personal portfolio with minimalist design and responsiveness.

-   [Guides](https://toha-guides.netlify.app/posts)

---

## Changes I've made

- Put all dependencies files (cs,js,...) into "/static/dependencies" and remake all links
- Remove pdf-js (embed-pdf.html + static files)

### **Index page**

#### Home background
- Add ParticleJS scripts (base + call/config)
    `themes\toha\layouts\index.html`
    ```html
    {{ if eq (lower site.Params.background) "particlesjs" }}
        <script type="text/javascript" src="{{ "/dependencies/particles-2.0.min.js" | relURL }}"></script>
        <script type="text/javascript" src="{{ "/js/particlesJsBackground.js" | relURL }}"></script>
    {{ end }}
    ```
    Add new if statement into `themes\toha\layouts\partials\sections\home.html` to handle ParticleJS

- Reduce background blur filter
    `themes\toha\static\css\sections\home.css` (line 17)
    ```css
    .background {
        ...
        filter: blur(1px);
        ...
    }
    ```

#### Navbar:

-   'blog' folder insead of 'posts' for content pages and use the `blog/_index.md` 'title' param as link if it exist  
    `themes\toha\layouts\partials\navigators\navbar.html` (line 109)
    ```html
    {{ if $blogEnabled }}
        <li class="nav-item">
            <a class="nav-link" id="blog-link" href="{{ "/blog" | relLangURL }}">
                {{ with .Site.GetPage "/blog" }}
                    {{ if (isset .Params "title") }}
                        {{ .Title }}
                    {{ else }}
                        {{ i18n "posts" }}
                    {{ end }}
                {{ end }}
            </a>
        </li>
    {{ end }}
    ```
- Light or dark icon dependending on system preferences.
    `themes\toha\static\js\darkmode-darkreader.js` (line 32)
    ```js
    function useSystemTheme() {
        localStorage.setItem(COLOR_THEME, SYSTEM);
        DarkReader.auto(DARK_OPTIONS, SVG_INVERT);

        // dark or light icon depending on system preferences
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.getElementById(NAVBAR_ICON_ID).src = DARK_ICON;
        } else {
            document.getElementById(NAVBAR_ICON_ID).src = LIGHT_ICON;
        }
        //document.getElementById(NAVBAR_ICON_ID).src = SYSTEM_ICON;
    }
    ```
    Computer icon also removed from dropdown selector (in `themes\toha\layouts\partials\navigators\theme-selector.html`)

#### Cards:

-   Make content not justified  
    `themes\toha\static\css\layouts\main.css`
    ```css
    /* .card-body {
        text-align: justify;
    } */
    ```

- Remove skills padding-bottom
    `themes\toha\static\css\sections\skills.css`
    ```css
    .skills-section .card .card-body {
        padding-bottom: 0rem;
    }
    ```


### **Index sections**

#### Experiences:

-   Reverse experiences list number
    `layouts\partials\sections\experiences.html`

    ```html
    {{ partial "sections/experiences/vertical-line.html" (sub $totalExperiences
    $index) }}
    ```

    -   this line appears 2 times

    `layouts\partials\sections\experiences\vertical-line.html`

    ```html
    <div class="circle font-weight-bold">{{ . }}</div>
    ```

#### Education:

-   Display "name" as card title above "institution" and text section with 'infos' key from the data files
    `layouts\partials\sections\education.html` (line 33)

    ```html
    <div class="row">
        <div class="col-lg-10 col-md-8">
            {{ if .institution.url }}
            <h5>
                <a
                    href="{{ .institution.url }}"
                    title="{{ .institution.name }} - {{ .name }}"
                    target="_blank"
                    rel="noopener"
                >
                    {{ .name }}
                </a>
            </h5>
            {{ else }}
            <h5>{{ .name }}</h5>
            {{ end }}
        </div>
        <div class="timeframe col-lg-2 col-md-4">{{ .timeframe }}</div>
    </div>
    <h6>{{ .institution.name }}</h6>

    {{ if .infos }}
    <div>
        <p>{{ .infos | markdownify }}</p>
    </div>
    {{ end }}
    ```

-   add button to link diploma ?

#### Accomplishments:

-   Cards sub-title and footer inside if statements
    `layouts\partials\cards\accomplishments.html` (line 5)
    ```html
    {{ if .organization }}
    <div class="sub-title">...</div>
    {{ end }}
    ```
    And line 23:
    ```html
    {{ if .certificateURL }}
    <div class="card-footer">...</div>
    {{ end }}
    ```

#### Recent posts:

-   Change link to 'blog' folder
    `layouts\partials\sections\recent-posts.html` (line)
    ```html
    {{ range first $numShow (where site.RegularPages.ByDate.Reverse "Type" "in"
    "blog" )}} {{ partial "cards/recent-post.html" . }} {{ end }}
    ```

#### Footer: 
- Fix footer lower part columns
    `themes\toha\layouts\partials\footer.html`
    ```html
      <div class="row justify-content-between">
        <div class="col-12 col-md-3">
            ...
        </div>
        <div class="col-12 col-md-3">
            {{ $copyrightNotice | markdownify }}
        </div>
        <div class="col-12 col-md-3">
            ...
        </div>
      </div>
    ```
  
### **Blog**

#### Navigation:
-   Langage selection: make french the default langage

    `layouts\partials\navigators\lang-selector-2.html`
    `themes\toha\layouts\partials\navigators\floating-lang-selector.html`
    ```html
        <a
            class="dropdown-item nav-link languages-item"
            href="{{ path.Join "/" (cond (eq .Language.Lang "fr") "" .Language.Lang) $pageURL }}"
        >
            {{ $countryCode := partial "helpers/country-code.html" . }}
            <span class="flag-icon flag-icon-{{$countryCode}}"></span>
            {{ .Language.LanguageName }}
        </a>
    ```

-   Sidebar header : using the param 'title' in `/posts/_index.md` if it exists.  
    `layouts/_default/list.html` et `layouts/_default/single.html`

    ```html
    <li id="list-heading">
        <a href="{{ .Type | relLangURL }}" data-filter="all">
            {{ with .Site.GetPage "/blog" }} {{ if (isset .Params "title") }} {{
            .Title }} {{ else }} {{ i18n "posts" }} {{ end }} {{ end }}
        </a>
    </li>
    ```

-   Buttons at the end of the posts: back to /blog + back to index
    `layouts\_default\single.html`

    ```html
    <div class="row d-flex justify-content-around">
            <a href="{{ .Type | relLangURL }}" class="btn btn-outline-info">
                <span>
                    <i class="fa fa-arrow-left"></i>
                    {{ with .Site.GetPage "/blog" }}
                        {{ if (isset .Params "title") }}
                            {{ .Title }}
                        {{ else }}
                            {{ i18n "posts" }}
                        {{ end }}
                    {{ end }}
                </span>
            </a>
            <a href="{{ site.BaseURL | relLangURL }}" class="btn btn-outline-info">
                <span>
                    <i class="fa fa-home"></i>
                    {{ i18n "home" }}
                </span>
            </a>
        </div>
    ```

#### Posts content
-  Not move `scroll-to-top` floating arrow on small device
    `layouts\_default\single.html`
    ```css
    @media only screen and (max-width: 768px) {
        /* #scroll-to-top {
            right: 8rem;
        } */
    }
    ```
- Shift `scroll-to-top` up if the translation dropdown is there
    `themes\toha\layouts\partials\navigators\floating-lang-selector.html`
    ```html
    <div class="dropdown languageSelector" id="floatingLanguageSelector">
        ...
    </div>
    ```
    `themes\toha\static\css\single.css`
    ```css
    #scroll-to-top {
        ...
        padding-bottom: 6vh;
    }
    ```

-  Courses datatable article: 
   -  Shortcode added base site files (`layouts\shortcodes\datatables.html`)
   -  DataTable files in `themes\toha\static\dependencies\datatables\` folder
   -  `themes\toha\static\js\single.js`
        ```js
        // Content datatables
        $('.datatable-fr').DataTable({
            lengthMenu: [
                [10, 25, -1],
                [10, 25, 'Tout'],
            ],
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json'
            }
        });
        $('.datatable-en').DataTable({
            lengthMenu: [
                [20, 50, -1],
                [20, 50, 'All'],
            ],
        });
    });
        ```

### **Translation**

-   Delete useless flags images and their references in `themes\toha\static\css\flag-icon.min.css`

#### French: `themes\toha\i18n\fr.toml`
```toml
[hugoAttributionText]
other = "Conçu avec"
[view_certificate]
other = "Certifications"
[certifcate]
other = "Certificat"
[resume]
other = "Mon CV"
[show_more]
other = "Afficher plus"
```

#### English: `themes\toha\i18n\en.toml`
```toml
[certificate]
other = "Certificate"
```