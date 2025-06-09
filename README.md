# Awal Dataface exercise

For this interview, you’ll be asked to contribute to the development of a hypothetical client project! We’ll want your input on how to set up the project’s infrastructure to meet the client’s needs, and your help coding a portion of the website.

In another universe, our agency just partnered with a non-profit in the health care space. They have proprietary data on the price of common health care procedures in the U.S. at various geographic levels. They’ve asked us to create a website visualizing the price of each procedure so patients can better understand a fair price of care.

Our design team has mocked up the webpage, and our dev team has already formatted the messy data from the client (something we do often!) into machine-readable files. First, review the mocks in this [Figma file](https://www.figma.com/design/ISpJarTNC9uHQsa7cKEJCJ/Dev-Interview-2025-Mockup---Kazi?node-id=0-1&p=f&t=zDqL1qObzu8xePEB-0). Then, download and review the formatted data files [here](https://drive.google.com/drive/folders/1L7oiCcO2lzqeY_JIVpKKYCvh3pis34hx?dmr=1&ec=wgc-drive-globalnav-goto). There’s a Data Dictionary doc in that folder with a brief overview of the contents of each file. Please note that the numbers in the data are fake, so you can ignore any inaccuracies.

Once you have a good understanding of these materials, we’d like your help with a few things:

## Data Infrastructure

We need to choose a database solution for this project. It should be able to comfortably host the existing files, as well as give the client the ability to update the data periodically, ultimately updating the site. The infrastructure should minimize intervention from our team and encourage clients to own the data (ideally without having to push a commit to GitHub because they may not be technical).

Based on those parameters, where would you store the data for this project? And what would the process be for the client to update the data on the site?

For this step, we’re not expecting you to do any coding or set anything up. During our interview, we’d like to hear how you’d approach this problem, and give us a high-level overview of how your solution would work technically. Here are some questions to consider that we may ask you:

Would you use the same database solution if the dataset was 100k rows? 1 million rows?

While we’ve just designed a single page for this site, it will technically have many pages. For example, there will be url.com/electrocardiogram/alaska and url.com/x-ray-knee-4-views/california, which will use the same page template but show different data. These pages should be dynamically generated based on the procedures and geographies available in the data. How would you set that up?

Lightweight, creative solutions are welcome. Use whatever you’re comfortable with that could get the job done.

## Developing the Site

Next, you'll have an opportunity to build the webpage mocked up in Figma. Even though our team uses Svelte, you’re free to use the framework / environment of your choice. You can either write the code beforehand and walk us through your product during the interview, or you could do a live coding session with us. Whatever you’d prefer!

The expectation here isn't that you'll finish building everything on the page, or match the styles perfectly (for example, don’t worry about using the right fonts). We simply want to see how you approach the development process, so it’s up to you to decide what you want to build out in the allotted time. If you choose to code at home, please do so in a public GitHub repo and try to time box your efforts to a few hours. If you choose to live code during the interview, please set up your coding environment before the call so you’re ready to go.

Lastly, we encourage you to use any third-party libraries, UI kits, or AI coding assistants (but please don’t “vibe code” your project). We’re always adopting new tools into our workflow, and would love to learn about what you use to develop websites.
