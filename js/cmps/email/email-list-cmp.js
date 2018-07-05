import itemPreview from './email-list-item-preview-cmp.js';

export default {
  template: `
    
    <div class="list-container flex-column">
        <!-- <div class="list-item-container flex"> -->
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>
           <item-preview></item-preview>

        <!-- </div> -->
        <!-- <div class="list-item-container flex">
           <item-preview></item-preview>
        </div>
        <div class="list-item-container flex">
           <item-preview></item-preview>
        </div>
        <div class="list-item-container flex">
           <item-preview></item-preview>
        </div>
        <div class="list-item-container flex">
           <item-preview></item-preview>
        </div>
        <div class="list-item-container flex">
           <item-preview></item-preview>
        </div>
        <div class="list-item-container flex">
           <item-preview></item-preview>
        </div> -->
    </div>
    `,

    components: {
        itemPreview
    }
};
